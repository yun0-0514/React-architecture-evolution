import { Member } from "@/types/member.types";
import { apiClient } from "./apiClient";
const BASE_API_URL = "http://localhost:4000/members";

export const fetchMember = () => apiClient<Member[]>(BASE_API_URL);

export const createMember = (newMember: Member) =>
  apiClient<Member>(BASE_API_URL, {
    method: "POST",
    body: JSON.stringify(newMember),
  });

export const updateMember = (
  id: string | number,
  updateData: Partial<Member>
) =>
  apiClient<Member>(`${BASE_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });

export const deleteMember = (id: string | number) =>
  apiClient<any>(`${BASE_API_URL}/${id}`, { method: "DELETE" });
