
--
-- Indexes for dumped tables
--


--
-- Indexes for table `ArrestsCacheTable`
--
ALTER TABLE `ArrestsCacheTable`
  ADD PRIMARY KEY (`arrest_stats_id`), ADD KEY `date_index` (`Date`), ADD KEY `team_index` (`Team`), ADD KEY `player_index` (`Name`), ADD KEY `crime_index` (`Category`), ADD KEY `crime_category_index` (`Crime_category`), ADD KEY `position_index` (`Position`), ADD KEY `reddit_index` (`reddit_group_id`);

--
-- Indexes for table `ArrestsCacheTable2`
--
ALTER TABLE `ArrestsCacheTable2`
  ADD PRIMARY KEY (`arrest_stats_id`), ADD KEY `date_index` (`Date`), ADD KEY `team_index` (`Team`), ADD KEY `player_index` (`Name`), ADD KEY `crime_index` (`Category`), ADD KEY `crime_category_index` (`Crime_category`), ADD KEY `position_index` (`Position`);

--
-- Indexes for table `arrest_stats`
--
ALTER TABLE `arrest_stats`
  ADD PRIMARY KEY (`arrest_stats_id`), ADD UNIQUE KEY `arrest_stats_id` (`arrest_stats_id`), ADD KEY `general_category_id` (`general_category_id`);

--
-- Indexes for table `External_Crime_Category`
--
ALTER TABLE `External_Crime_Category`
  ADD PRIMARY KEY (`External_Crime_Category_id`);

--
-- Indexes for table `External_crime_category_relation`
--
ALTER TABLE `External_crime_category_relation`
  ADD PRIMARY KEY (`general_category_id`,`External_Crime_Category_id`);

--
-- Indexes for table `External_Sources`
--
ALTER TABLE `External_Sources`
  ADD PRIMARY KEY (`External_Source_id`);

--
-- Indexes for table `free_arrests`
--
ALTER TABLE `free_arrests`
  ADD PRIMARY KEY (`arrest_stats_id`), ADD KEY `general_category_id` (`general_category_id`);

--
-- Indexes for table `general_category`
--
ALTER TABLE `general_category`
  ADD PRIMARY KEY (`general_category_id`);

--
-- Indexes for table `legal_level`
--
ALTER TABLE `legal_level`
  ADD PRIMARY KEY (`legal_level_id`);
--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`), ADD UNIQUE KEY `position_tag` (`position_tag`);

--
-- Indexes for table `resolution_category`
--
ALTER TABLE `resolution_category`
  ADD PRIMARY KEY (`resolution_category_id`);

--
-- Indexes for table `seasons`
--
ALTER TABLE `seasons`
  ADD UNIQUE KEY `season` (`season`);


--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teams_id`);

--
-- Indexes for table `teams_detail`
--
ALTER TABLE `teams_detail`
  ADD PRIMARY KEY (`Team_name`);


--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arrest_stats`
--
ALTER TABLE `arrest_stats`
  MODIFY `arrest_stats_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=908;

--
-- AUTO_INCREMENT for table `External_Crime_Category`
--
ALTER TABLE `External_Crime_Category`
  MODIFY `External_Crime_Category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `External_Sources`
--
ALTER TABLE `External_Sources`
  MODIFY `External_Source_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `free_arrests`
--
ALTER TABLE `free_arrests`
  MODIFY `arrest_stats_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `general_category`
--
ALTER TABLE `general_category`
  MODIFY `general_category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `legal_level`
--
ALTER TABLE `legal_level`
  MODIFY `legal_level_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;

-- AUTO_INCREMENT for table `resolution_category`
--
ALTER TABLE `resolution_category`
  MODIFY `resolution_category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teams_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=38;
