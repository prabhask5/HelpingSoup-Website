create table customer(
	customerID char(10) NOT NULL PRIMARY KEY,
	customerFirstName varchar(50) NULL,
	customerLastName varchar(50) NULL,
	customerPhone char(10) NULL,
	customerEmail varchar(100) NULL,
	customerStreetAddress varchar(100) NULL,
	customerCity varchar(100) NULL,
	customerZip char(5) NULL
);

create table goods(
	goodsID char(10) NOT NULL PRIMARY KEY,
	customerID char(10) FOREIGN KEY REFERENCES customer(customerID),
	pickupDate Date NULL,
	pickupTime Time NULL,
	startTime Datetime2 NULL,
	endTime Datetime2 NULL,
	goodsNotes varchar(250) NULL,
	goodsAssigned Bit NULL
);

create table volunteer(
	volunteerEmail varchar(100) NOT NULL PRIMARY KEY,
	volunteerStreetAddress varchar(100) NULL,
	volunteerCity varchar(100) NULL,
	volunteerZip char(5) NULL,
	volunteerPassword varchar(100) NULL,
	volunteerSchool varchar(100) NULL,
	volunteerFirstName varchar(50) NULL,
	volunteerLastName varchar(50) NULL
);

create table volunteerDelivery(
	deliveryNotesID char(10) NOT NULL PRIMARY KEY,
	deliveryNotes varchar(250) NULL,
	deliveryStatus Bit NULL,
	volunteerEmail varchar(100) FOREIGN KEY REFERENCES volunteer(volunteerEmail),
	goodsID char(10) FOREIGN KEY REFERENCES goods(goodsID)
);