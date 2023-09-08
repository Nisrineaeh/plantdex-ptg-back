import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Plant {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    code_plant: number;

    
    @Column({length: 500})
    nom:string;

    @Column()
    soleil:string;

    @Column('int')
    arrosage: number;

    @Column({length: 500})
    categorie : string;

    @Column({ length: 500 })
    image: string;

    @Column({ type:'int', nullable: true})
    user_id: number;

    @ManyToOne(()=> User, (user)=> user.plants)
    @JoinColumn({name : 'user_id'})
    user: User;
}
