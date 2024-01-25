-- migrate:up
CREATE TABLE IF NOT EXISTS user (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `password` varchar(100),
    `phone` varchar(100),
    `refreshToken` varchar(100),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `productName` varchar(100),
    `title` varchar(50),
    `price` varchar(50),
    `img` varchar(100),
    `grade` varchar(10),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `categoryName` varchar(100),
    `img` varchar(100),`created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
)

-- migrate:down

DROP DATABASE telegramShop