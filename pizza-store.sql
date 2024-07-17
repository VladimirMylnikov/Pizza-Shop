-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3307
-- Время создания: Июл 17 2024 г., 23:00
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `pizza-store`
--

-- --------------------------------------------------------

--
-- Структура таблицы `assortiment`
--

CREATE TABLE `assortiment` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `text` text,
  `type` varchar(11) DEFAULT NULL,
  `small` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '25 см',
  `medium` varchar(11) DEFAULT '30 см',
  `big` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '35 см',
  `price_small` int DEFAULT '500',
  `price_medium` int DEFAULT '700',
  `price_big` int DEFAULT '900'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `assortiment`
--

INSERT INTO `assortiment` (`id`, `name`, `image`, `text`, `type`, `small`, `medium`, `big`, `price_small`, `price_medium`, `price_big`) VALUES
(1, 'Четыре сыра', '../project/img/section-catalog/1.png', 'Моцарелла, Пармезан, Горгонзола, Чеддер, томатный соус, орегано', 'cheese', '35 см', '30 см', '25 см', 900, 700, 500),
(2, 'Сырный взрыв', '../project/img/section-catalog/2.png', 'Моцарелла, Эмменталь, Рикотта, сливочный соус, базилик', 'cheese', '35 см', '30 см', '25 см', 800, 600, 450),
(3, 'Сырная фантазия', '../project/img/section-catalog/3.png', 'Моцарелла, Камамбер, Фета, томатный соус, чеснок, петрушка', 'cheese', '35 см', '30 см', '25 см', 850, 650, 550),
(4, 'Мясной пир', '../project/img/section-catalog/4.png', 'Пепперони, ветчина, бекон, моцарелла, томатный соус, орегано.', 'meat', '35 см', '30 см', '25 см', 950, 750, 550),
(5, 'Охотничья', '../project/img/section-catalog/5.png', 'Охотничьи колбаски, куриное филе, бекон, моцарелла, томатный соус, лук, перец', 'meat', '35 см', '30 см', '25 см', 920, 720, 520),
(6, 'Мясное ассорти', '../project/img/section-catalog/6.png', 'Говядина, салями, ветчина, моцарелла, томатный соус, шампиньоны, оливки', 'meat', '35 см', '30 см', '25 см', 900, 700, 500),
(7, 'Грибная классика', '../project/img/section-catalog/7.png', 'Шампиньоны, моцарелла, томатный соус, чеснок, петрушка', 'mushrooms', '35 см', '30 см', '25 см', 820, 620, 420),
(8, 'Лесная поляна', '../project/img/section-catalog/8.png', 'Белые грибы, шампиньоны, моцарелла, сливочный соус, тимьян', 'mushrooms', '35 см', '30 см', '25 см', 840, 640, 440),
(9, 'Грибной микс', '../project/img/section-catalog/9.png', 'Лисички, шампиньоны, вешенки, моцарелла, томатный соус, базилик', 'mushrooms', '35 см', '30 см', '25 см', 850, 650, 450);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `assortiment`
--
ALTER TABLE `assortiment`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
