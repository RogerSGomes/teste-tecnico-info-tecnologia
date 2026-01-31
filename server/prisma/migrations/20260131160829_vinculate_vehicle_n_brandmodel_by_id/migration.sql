/*
  Warnings:

  - You are about to drop the column `model` on the `vehicle` table. All the data in the column will be lost.
  - Added the required column `fk_model_id` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fk_brand_id" TEXT NOT NULL,
    "fk_model_id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    CONSTRAINT "vehicle_fk_brand_id_fkey" FOREIGN KEY ("fk_brand_id") REFERENCES "brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vehicle_fk_model_id_fkey" FOREIGN KEY ("fk_model_id") REFERENCES "brand_model" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vehicle" ("chassis", "fk_brand_id", "id", "license_plate", "renavam", "year") SELECT "chassis", "fk_brand_id", "id", "license_plate", "renavam", "year" FROM "vehicle";
DROP TABLE "vehicle";
ALTER TABLE "new_vehicle" RENAME TO "vehicle";
CREATE UNIQUE INDEX "vehicle_license_plate_key" ON "vehicle"("license_plate");
CREATE UNIQUE INDEX "vehicle_chassis_key" ON "vehicle"("chassis");
CREATE UNIQUE INDEX "vehicle_renavam_key" ON "vehicle"("renavam");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
