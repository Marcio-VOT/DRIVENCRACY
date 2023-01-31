import { ObjectId } from "mongodb";
import {
  voteCollection,
  voteOptionCollection,
  pollCollection,
} from "../../config/database.js";

export default async (req, res) => {
  try {
    const { _id } = res.locals;
    const poll = await pollCollection.find({ _id }).toArray();
    let choiceCollection = await voteOptionCollection
      .find({ pollId: _id }, { projection: { title: 0, pollId: 0 } })
      .toArray();
    choiceCollection = choiceCollection.map((id) => id._id);

    const choiceList = await voteCollection
      .find({ choiceId: { $in: choiceCollection } })
      .toArray();

    const count = choiceList.reduce((acc, obj) => {
      acc[obj.choiceId] = (acc[obj.choiceId] || 0) + 1;
      return acc;
    }, {});
    const key = Object.keys(count)[0];
    const votes = count[Object.keys(count)[0]];
    const result = await voteOptionCollection.findOne(
      {
        _id: ObjectId(key),
      },
      { projection: { pollId: 0, _id: 0 } }
    );
    result.votes = votes;
    poll[0].result = result;
    console.log(poll);
    res.send("a");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
