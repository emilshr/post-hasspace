import { Op } from "sequelize";
import {
  InboxParticipantModel,
  UserModel,
  InboxModel,
  InboxParticipant,
  InboxParticipantStatus,
  MessageModel,
} from "../models/schema";

export const getInboxes = async (
  userId: string,
  inboxStatus: InboxParticipantStatus = InboxParticipantStatus.ACCEPTED
) => {
  const parsedData = await InboxParticipantModel.findAll({
    where: { userId, inboxStatus },
    include: [
      {
        model: InboxModel,
        include: [
          {
            model: MessageModel,
            limit: 1,
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: UserModel,
              },
            ],
          },
        ],
      },
    ],
  });
  return parsedData;
};

export const getRequestCount = async (userId: string) => {
  const { count } = await InboxParticipantModel.findAndCountAll({
    where: { userId, inboxStatus: InboxParticipantStatus.NOT_ACCEPTED },
  });
  return count;
};

export const viewUsers = async (userId: string) => {
  const allUsers = await UserModel.findAll({
    where: { userId: { [Op.not]: userId } },
  });
  console.log({ allUsers });
  const parsedData = allUsers.map(({ dataValues }) => dataValues);
  return parsedData;
};

export const createInbox = async (
  userId: string,
  participatingUserIds: string[],
  inboxName: string
) => {
  try {
    const {
      dataValues: { inboxId },
    } = await InboxModel.create({ inboxName });

    const payload = participatingUserIds.map<Omit<InboxParticipant, "id">>(
      (uid) => ({
        inboxId,
        inboxStatus: InboxParticipantStatus.NOT_ACCEPTED,
        userId: uid,
      })
    );

    await InboxParticipantModel.bulkCreate([
      {
        inboxId,
        inboxStatus: InboxParticipantStatus.ACCEPTED,
        userId,
      },
      ...payload,
    ]);

    return inboxId;
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const getInboxMetaData = async (userId: string, inboxId: string) => {
  const data = await InboxModel.findOne({
    where: { inboxId },
    include: [
      UserModel,
      {
        through: {
          where: {
            userId,
          },
        },
      },
    ],
  });
};

export const respondToInbox = async (
  inboxStatus: InboxParticipantStatus,
  inboxId: string,
  userId: string
) => {
  const data = await InboxParticipantModel.update(
    { inboxStatus },
    { returning: true, where: { inboxId, userId } }
  );
  return data;
};
