import { create } from 'zustand'

const useAuthStore = create((set) => ({
  footerHeight: 0,
  setFooterHeight: (newFooterHeight) => set({ footerHeight: newFooterHeight }),
  username: "",
  setUsername: (newUsername) => set({ username: newUsername }),
  nickname: "",
  setNickname: (newNickname) => set({ nickname: newNickname }),
  password: "",
  setPassword: (newPassword) => set({ password: newPassword }),
  passwordConfirm: "",
  setPasswordConfirm: (newPasswordConfirm) => set({ passwordConfirm: newPasswordConfirm }),
  avatar: "",
  setAvatar: (newAvatar) => set({ avatar: newAvatar }),
}))

export default useAuthStore