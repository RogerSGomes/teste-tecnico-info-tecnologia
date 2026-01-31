export class UpdateBrandDto {
  name?: string;
  modelsToAdd?: string[]; // Nomes dos novos modelos a serem adicionados
  modelsToRemove?: string[]; // Ids dos modelos a serem removidos
}
