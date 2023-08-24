import { MessageModel, InboxModel } from "../models/schema";

export const sendMessage = async (
  userId: string,
  inboxId: string,
  message: string
) => {
  const createdMessage = await MessageModel.create({
    inboxId,
    message,
    userId,
  });
  const { messageId } = createdMessage.dataValues;

  console.log(createdMessage.dataValues);

  // Updating the inbox record so that the last read records show up
  await InboxModel.update(
    { lastMessageId: messageId, lastSentUserId: userId },
    { returning: true, where: { inboxId } }
  );
  return createdMessage;
};

export const fetchMessages = async (inboxId: string) => {
  // const foundMessages = await MessageModel.findAll({
  //   where: { inboxId },
  //   include: [
  //     {
  //       model: InboxModel,
  //       through: {
  //         where: {
  //           inboxId,
  //         },
  //       },
  //     },
  //   ],
  // });
  const foundMessages = await InboxModel.findOne({
    where: { inboxId },
    include: [
      {
        model: MessageModel,
      },
    ],
  });
  return foundMessages;
};
