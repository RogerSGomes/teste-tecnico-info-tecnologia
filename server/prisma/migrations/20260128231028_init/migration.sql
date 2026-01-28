-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fk_brand_id" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    CONSTRAINT "vehicle_fk_brand_id_fkey" FOREIGN KEY ("fk_brand_id") REFERENCES "brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_license_plate_key" ON "vehicle"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_chassis_key" ON "vehicle"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_renavam_key" ON "vehicle"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "brand_name_key" ON "brand"("name");
