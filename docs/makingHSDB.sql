create table customer(
	customerID char(10) NOT NULL PRIMARY KEY,
	customerFirstName varchar(50) NOT NULL,
	customerLastName varchar(50) NOT NULL,
	customerPhone char(10) NULL,
	customerEmail varchar(100) NULL,
	customerAddress varchar(100) NOT NULL,
);

create table goods(
	goodsID char(10) NOT NULL PRIMARY KEY,
	customerID char(10) FOREIGN KEY REFERENCES customer(customerID),
	startTime Datetime2 NULL,
	endTime Datetime2 NULL,
	goodsNotes varchar(250) NULL,
	goodsAssigned Bit NULL
);

create table volunteer(
	volunteerEmail varchar(100) NOT NULL PRIMARY KEY,
	volunteerAddress varchar(100) NULL,
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