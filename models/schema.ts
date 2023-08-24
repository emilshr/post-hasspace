import { Optional, ModelDefined, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export interface User {
  id: string;
  userId: string;
  username: string;
  hashedPassword: string;
}

type UserCreationAttributes = Optional<User, "id" | "userId">;

export const UserModel: ModelDefined<User, UserCreationAttributes> =
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.TEXT,
    },
  });

export interface Inbox {
  id: string;
  inboxId: string;
  inboxName: string;
  lastMessageId: string;
  lastSentUserId: string;
}

type InboxCreationAttributes = Optional<
  Inbox,
  "id" | "inboxId" | "lastMessageId" | "lastSentUserId"
>;

export const InboxModel: ModelDefined<Inbox, InboxCreationAttributes> =
  sequelize.define("Inbox", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    inboxId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    inboxName: {
      type: new DataTypes.STRING(128),
    },
    lastMessageId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    lastSentUserId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });

export enum InboxParticipantStatus {
  ACCEPTED = "ACCEPTED",
  NOT_ACCEPTED = "NOT_ACCEPTED",
  BLOCKED = "BLOCKED",
}

export interface InboxParticipant {
  id: string;
  userId: string;
  inboxId: string;
  inboxStatus: InboxParticipantStatus;
}

type InboxParticipantCreationAttributes = Optional<InboxParticipant, "id">;

export const InboxParticipantModel: ModelDefined<
  InboxParticipant,
  InboxParticipantCreationAttributes
> = sequelize.define("InboxParticipant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
  },
  inboxId: {
    type: DataTypes.UUID,
  },
  inboxStatus: {
    type: DataTypes.ENUM,
    values: [
      InboxParticipantStatus.ACCEPTED,
      InboxParticipantStatus.BLOCKED,
      InboxParticipantStatus.NOT_ACCEPTED,
    ],
  },
});

export interface Message {
  id: string;
  messageId: string;
  userId: string;
  inboxId: string;
  message: string;
  timeStamp: Date;
}

type MessageCreationAttributes = Optional<
  Message,
  "id" | "messageId" | "timeStamp"
>;

export const MessageModel: ModelDefined<Message, MessageCreationAttributes> =
  sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    messageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      // references: {
      //   model: UserModel,
      //   key: "userId",
      // },
    },
    inboxId: {
      type: DataTypes.UUID,
      // references: {
      //   model: InboxModel,
      //   key: "inboxId",
      // },
    },
    message: {
      type: DataTypes.TEXT,
    },
    timeStamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

InboxModel.hasMany(InboxParticipantModel, {
  foreignKey: "inboxId",
  sourceKey: "inboxId",
});
InboxParticipantModel.belongsTo(InboxModel, {
  foreignKey: "inboxId",
  targetKey: "inboxId",
});

InboxModel.hasMany(MessageModel, {
  foreignKey: "inboxId",
  sourceKey: "inboxId",
});
MessageModel.belongsTo(InboxModel, {
  foreignKey: "inboxId",
  targetKey: "inboxId",
});

UserModel.hasMany(InboxParticipantModel, {
  foreignKey: "userId",
  sourceKey: "userId",
});
InboxParticipantModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "userId",
});

UserModel.hasMany(MessageModel, { foreignKey: "userId", sourceKey: "userId" });
MessageModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "userId",
});
