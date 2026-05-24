

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `itemName` varchar(130) DEFAULT NULL,
  `Specification` varchar(100) DEFAULT NULL,
  `UnitMeasure` varchar(50) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `UnityPrice` decimal(10,2) DEFAULT NULL,
  `TotalQuantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `items` (`item_id`, `itemName`, `Specification`, `UnitMeasure`, `Quantity`, `UnityPrice`, `TotalQuantity`) VALUES
(1, 'Cassavaa', 'Plant', 'Kg', 20, 500.00, 20),
(2, 'sugers', 'Food', 'Kg', 35, 250.00, 35),
(5, 'Water meroni', 'EARTG', 'Kg', 12, 175.00, 12);


CREATE TABLE `sales` (
  `sales_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `sales_date` datetime DEFAULT current_timestamp(),
  `TotalPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `sales` (`sales_id`, `user_id`, `sales_date`, `TotalPrice`) VALUES
(1, 2, '2026-05-23 08:19:43', 5500.00),
(2, 3, '2026-05-23 09:10:00', 4600.00),
(3, 2, '2026-05-23 14:19:08', 27600.00),
(4, 3, '2026-05-23 15:40:53', 40800.00);


CREATE TABLE `salesdetail` (
  `salesD_id` int(11) NOT NULL,
  `sales_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `QuantitySold` int(11) DEFAULT NULL,
  `SubTotalPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `salesdetail` (`salesD_id`, `sales_id`, `item_id`, `QuantitySold`, `SubTotalPrice`) VALUES
(1, 1, 1, 2, 2400.00),
(2, 1, 2, 1, 1500.00),
(4, 2, 2, 1, 1500.00),
(6, 3, 1, 23, 27600.00),
(7, 4, 1, 34, 40800.00);



CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` enum('admin','customer') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `users` (`user_id`, `username`, `password`, `role`) VALUES
(2, 'fabrice', '111', 'customer'),
(3, 'claude', '222', 'customer'),
(4, 'valens', '123', 'customer'),
(5, 'tuyisenge', '$2b$10$WULtrfdrLSksHls8xSeN0eikAHXptelY.mYfIFEh8rTgq4TMiwZfi', 'customer'),
(6, 'HR_', '$2b$10$HGrzOIjk3mWhXM.wtr13a.qChsWZau9.LH1RyVgofr9p6I.T8iphS', 'admin');


ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);


ALTER TABLE `sales`
  ADD PRIMARY KEY (`sales_id`),
  ADD KEY `user_id` (`user_id`);


ALTER TABLE `salesdetail`
  ADD PRIMARY KEY (`salesD_id`),
  ADD KEY `sales_id` (`sales_id`),
  ADD KEY `item_id` (`item_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);


ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


ALTER TABLE `sales`
  MODIFY `sales_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `salesdetail`
  MODIFY `salesD_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;


ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;


ALTER TABLE `salesdetail`
  ADD CONSTRAINT `salesdetail_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `sales` (`sales_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `salesdetail_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE;
COMMIT;

