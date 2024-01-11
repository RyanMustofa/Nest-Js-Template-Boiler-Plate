import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isTitle: boolean;

  @Column({ type: 'varchar', nullable: false, default: false })
  code: string;

  @Column({ type: 'integer', nullable: true })
  parentId?: number;

  @Column({ type: 'varchar', nullable: false, default: '/' })
  path: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
