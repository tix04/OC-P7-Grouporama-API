-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2021 at 12:06 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grouporama`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment_content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `time_created`, `comment_content`) VALUES
(80, 24, 62, '2021-06-08 18:22:19', 'Hey employee #3. How are you?'),
(81, 23, 62, '2021-06-08 18:22:45', 'Why didn\'t you invite me to come with you?'),
(82, 24, 58, '2021-06-08 18:25:44', 'Hey employee #3. Have you heard, John has been fired!! I really didn\'t like him, I\'m not going to miss him at all!!'),
(83, 25, 58, '2021-06-08 18:26:30', 'Hello employee #4. Show us some pictures of how you spend your weekend!!'),
(84, 25, 59, '2021-06-08 18:29:28', 'Employee #1 is right. Adding some pictures will help use get to know you better!!'),
(86, 25, 59, '2021-06-08 18:32:31', 'Wow , now that you added a profile picture, we are able to see how beautfiul you are!!');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `comments` int(11) NOT NULL,
  `post_content` text NOT NULL,
  `post_image` varchar(255) NOT NULL,
  `likes_array` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `time_created`, `user_id`, `likes`, `comments`, `post_content`, `post_image`, `likes_array`) VALUES
(22, '2021-06-08 18:30:44', 58, 2, 0, 'New Post by Employee # 1. Hello everyone.', 'http://localhost:3000/images/image1623174918349.jpg', '[58,59]'),
(23, '2021-06-08 18:31:14', 59, 2, 1, 'This is a post by employee #2. Hello to all. This post text content has been modified so we added this last sentence to prove it.', 'http://localhost:3000/images/image1623175133296.jpg', '[58,59]'),
(24, '2021-06-08 18:25:44', 60, 0, 2, 'This post content is made by employee #3. This only contains text content!!! No images', '', '[]'),
(25, '2021-06-08 18:32:31', 61, 1, 3, 'This post is made by employee #4. The profile Picture, password and username has been edited in user profile settings. No post image is selected but only text', '', '[59]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `viewed_posts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `first_name`, `last_name`, `age`, `email`, `profile_image`, `viewed_posts`) VALUES
(58, 'employee_1', '$2b$10$Si/ntvL42GUeKD0NmWSYj.QSn59q2zsV20YWjwNhPmu65REmQba/u', 'Employee', 'One', 21, 'employee1@mail.com', 'http://localhost:3000/images/image1623174827264.jpg', 3),
(59, 'employee_2', '$2b$10$QgkO2AZqL3OO49IMfC48s.mZ3vVf2szv0JZW7JdB9Ruh9WqE35gTO', 'Employee', 'Two', 22, 'employee2@mail.com', '', 3),
(60, 'employee3', '$2b$10$RtonZQpCSYx6ViiOC1uiXOG0UFzo9bwO5fArEe6ShqDyPswNtBI8m', 'Employee', 'Three', 23, 'employee3@mail.com', 'http://localhost:3000/images/image1623175337876.jpg', 2),
(61, 'employee_4', '$2b$10$2fOZRKYDK92r/jIASU9vC.ZYqwy3mfds5FLikNAafnHlLqeYtgPQa', 'Employee', 'Four', 24, 'employee4@mail.com', 'http://localhost:3000/images/image1623175603870.jpg', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
