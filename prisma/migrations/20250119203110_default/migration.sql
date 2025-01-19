-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "level" INTEGER NOT NULL,
    "vutCoins" INTEGER NOT NULL,
    "vutDollars" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userTeamId" INTEGER NOT NULL,
    CONSTRAINT "User_userTeamId_fkey" FOREIGN KEY ("userTeamId") REFERENCES "UserTeam" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserTeam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER,
    "name" TEXT,
    "pictureUrl" TEXT
);

-- CreateTable
CREATE TABLE "CardPlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vlrUrl" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "playerStatsId" INTEGER NOT NULL,
    "userTeamId" INTEGER,
    "packsId" INTEGER,
    CONSTRAINT "CardPlayer_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardPlayer_playerStatsId_fkey" FOREIGN KEY ("playerStatsId") REFERENCES "PlayerStats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardPlayer_userTeamId_fkey" FOREIGN KEY ("userTeamId") REFERENCES "UserTeam" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "CardPlayer_packsId_fkey" FOREIGN KEY ("packsId") REFERENCES "Packs" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "flagUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandUlr" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "cardPlayerId" INTEGER,
    CONSTRAINT "Agent_cardPlayerId_fkey" FOREIGN KEY ("cardPlayerId") REFERENCES "CardPlayer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "overall" INTEGER NOT NULL,
    "averageCombatScore" INTEGER NOT NULL,
    "killsDeaths" INTEGER NOT NULL,
    "kast" INTEGER NOT NULL,
    "averageDamagePerRound" INTEGER NOT NULL,
    "killsPerRound" INTEGER NOT NULL,
    "firstKillsPerRound" INTEGER NOT NULL,
    "headShotRate" INTEGER NOT NULL,
    "clutchSuccess" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Leagues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userTeamId" INTEGER,
    CONSTRAINT "Leagues_userTeamId_fkey" FOREIGN KEY ("userTeamId") REFERENCES "UserTeam" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Packs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceVUTC" INTEGER NOT NULL,
    "priceVUTD" INTEGER NOT NULL,
    "isOpened" BOOLEAN NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Packs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
