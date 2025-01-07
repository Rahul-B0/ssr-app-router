"use server";

import axios from "axios";

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const fetchPost = async () => {
  return fetcher(`https://jsonplaceholder.typicode.com/posts`);
};

export const fetchPostById = async (id: string) => {
  return fetcher(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
