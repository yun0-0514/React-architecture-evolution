const BASE_API_URL = "http://localhost:4000/members";

export const fetchMember = async () => {
  const response = await fetch(BASE_API_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error("Member 조회 실패");
    throw new Error(`member 조회 실패 ${BASE_API_URL}`);
  }

  return response.json();
};

export const createMember = async (newMember) => {
  const response = await fetch(BASE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMember),
  });
  if (!response.ok) {
    throw new Error(`Member 등록 실패 ${BASE_API_URL}`);
  }
  return response.json();
};
export const updateMember = async (id, updateData) => {
  const response = await fetch(`${BASE_API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error(`Member 업데이트 실패 ${BASE_API_URL}/${id}`);
  }
  return response.json();
};
export const deleteMember = async (id) => {
  const response = await fetch(`${BASE_API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`${id} member 삭제 실패 ${BASE_API_URL}/${id}`);
  }
  return id;
};
