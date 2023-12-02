import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Menu {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  description: string;
}
export const MenuSchema = SchemaFactory.createForClass(Menu);
