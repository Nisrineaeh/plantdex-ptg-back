import { Plant } from "src/plants/entities/plant.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    username: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column()
    role: string;

    @OneToMany(() => Plant, (plant) => plant.user, { eager: true })
    plants : Plant[];



}
