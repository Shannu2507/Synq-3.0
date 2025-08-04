import supabase from './supabaseClient'

export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users!inner(username, profile_picture)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data
}
