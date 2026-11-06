"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
export type Status = "To Read" | "Reading" | "Finished";
export type Book = { id: string; user_id: string; title: string; author: string; pages: number; status: Status; created_at: string };
type BookContextValue = { books: Book[]; loading: boolean; error: string; addBook: (book: Omit<Book, "id" | "user_id" | "created_at">) => Promise<void>; advanceBook: (book: Book) => Promise<void>; deleteBook: (id: string) => Promise<void> };
const BooksContext = createContext<BookContextValue | null>(null);
export function BooksProvider({ user, children }: { user: User; children: ReactNode }) {
 const [books, setBooks] = useState<Book[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
 const reload = useCallback(async () => { if (!supabase) { setError("Supabase is not configured."); setBooks([]); setLoading(false); return; } setLoading(true); const { data, error: err } = await supabase.from("books").select("*").eq("user_id", user.id).order("created_at", { ascending: false }); if (err) { setError(err.message); setBooks([]); } else { setError(""); setBooks((data ?? []) as Book[]); } setLoading(false); }, [user.id]);
 useEffect(() => { setBooks([]); setError(""); void reload(); }, [user.id, reload]);
 const addBook = async (book: Omit<Book, "id" | "user_id" | "created_at">) => { if (!supabase) throw new Error("Supabase is not configured."); const { data, error: err } = await supabase.from("books").insert({ ...book, user_id: user.id }).select().single(); if (err) throw err; setBooks(old => [data as Book, ...old]); };
 const advanceBook = async (book: Book) => { const next: Status = book.status === "To Read" ? "Reading" : "Finished"; if (!supabase) throw new Error("Supabase is not configured."); const { data, error: err } = await supabase.from("books").update({ status: next }).eq("id", book.id).eq("user_id", user.id).select().single(); if (err) throw err; setBooks(old => old.map(item => item.id === book.id ? data as Book : item)); };
 const deleteBook = async (id: string) => { if (!supabase) throw new Error("Supabase is not configured."); const { error: err } = await supabase.from("books").delete().eq("id", id).eq("user_id", user.id); if (err) throw err; setBooks(old => old.filter(item => item.id !== id)); };
 return <BooksContext.Provider value={{ books, loading, error, addBook, advanceBook, deleteBook }}>{children}</BooksContext.Provider>;
}
export function useBooks() { const ctx = useContext(BooksContext); if (!ctx) throw new Error("useBooks must be used within BooksProvider"); return ctx; }
