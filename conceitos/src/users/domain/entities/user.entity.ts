// TODO: aqui usa typescript puro sem nenhum uso de libs

import { generateUniqueId } from '@/shared/utils/generateUniqueId';

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity {
  constructor(public readonly props: UserProps) {
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.id = generateUniqueId();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
