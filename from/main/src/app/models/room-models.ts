export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE'
}

export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
  DISABLED = 'DISABLED'
}

// ========================
// DTO: RoomDto
// ========================
export interface RoomDto {
  id: number;
  roomNumber: string;
  type: RoomType;
  status: RoomStatus;
  capacity: number;
  floor: number;
  pricePerMonth: number;
  description: string;
  additionalServices: string[];
  createdAt: string;
  updatedAt: string;
}

// ========================
// DTO: CreateRoomDto
// ========================
export interface CreateRoomDto {
  roomNumber: string;
  type: RoomType;
  capacity: number;
  floor: number;
  pricePerMonth: number;
  description: string;
  additionalServices: string[];
}

// ========================
// DTO: UpdateRoomDto
// ========================
export interface UpdateRoomDto {
  type: RoomType;
  status: RoomStatus;
  capacity: number;
  pricePerMonth: number;
  description: string;
  additionalServices: string[];
}

// ========================
// DTO: RoomAvailabilityDto
// ========================
export interface RoomAvailabilityDto {
  roomId: number;
  available: boolean;
  message: string;
}
