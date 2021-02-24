import { ObjectType } from "@nestjs/graphql";
import { roleUser } from "src/authz/user.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity()
export class User{

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    LastName: string

    @Column()
    Email: string

    @Column()
    phoneNumber: string
    /*
    @ManyToOne(type => roleUser, roleuser => roleuser.tasks, { eager: false })
  roleuser: roleUser;
  */

}

