-- CreateTable
CREATE TABLE "brand_model" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fk_brand_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "brand_model_fk_brand_id_fkey" FOREIGN KEY ("fk_brand_id") REFERENCES "brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_model_fk_brand_id_name_key" ON "brand_model"("fk_brand_id", "name");
