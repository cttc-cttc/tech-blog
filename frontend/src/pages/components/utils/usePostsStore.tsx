import { create } from "zustand";

//? 검색 상태를 관리하는 Zustand 스토어

interface searchState {
  isSearching: boolean;
  setSearchState: (b: boolean) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export const usePostsStore = create<searchState>(set => ({
  isSearching: false,
  setSearchState: b => set({ isSearching: b }),
  searchKeyword: "",
  setSearchKeyword: keyword => set({ searchKeyword: keyword }),
}));
