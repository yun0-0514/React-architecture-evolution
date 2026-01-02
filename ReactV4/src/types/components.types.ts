import { Member } from "./member.types";
import { Product, ProductSearchCondition } from "../types/product.type";
export interface FormProps {
  selectedMember: Member | null;
  clearSelection: () => void;
}

export interface CardProps {
  data: Member;
  onEdit: (member: Member) => void;
}
export interface ProductCardProps {
  data: Product;
}
export interface SearchBarProps {
  onSearch: (codition: ProductSearchCondition) => void;
}
