import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    private _email: string;
    public get email(): string {
            return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    @ApiProperty()
    @Column()
        private _password: string;
        public get password(): string {
            return this._password;
        }
        public set password(value: string) {
            this._password = value;
        }

    @Column()
    securityStamp: string;
}
