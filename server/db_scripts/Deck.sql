USE [CardGame]
GO

/****** Object:  Table [dbo].[Deck]    Script Date: 22/08/2017 14:47:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Deck](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NOT NULL
) ON [PRIMARY]
GO