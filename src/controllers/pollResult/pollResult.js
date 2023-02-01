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
    if (!choiceList[0]) {
      poll[0].result = { title: "", votes: 0 };
      return res.send(poll);
    }

    const count = choiceList.reduce((acc, obj) => {
      acc[obj.choiceId] = (acc[obj.choiceId] || 0) + 1;
      return acc;
    }, {});
    let maxCount = 0;
    let mostFrequent = [];
    for (let key in count) {
      if (count[key] > maxCount) {
        maxCount = count[key];
        mostFrequent = [{ key: key, value: count[key] }];
      } else if (count[key] === maxCount) {
        mostFrequent.push({ key: key, value: count[key] });
      }
    }
    const id = mostFrequent.map((id) => ObjectId(id.key));
    const votes = mostFrequent.map((total) => total.value);
    let result = await voteOptionCollection
      .find(
        {
          _id: { $in: id },
        },
        { projection: { pollId: 0 } }
      )
      .toArray();

    if (!result[1]) {
      poll[0].result = { title: result[0].title, votes: votes[0] };
      return res.send(poll);
    }

    result = result.map((e) => {
      mostFrequent.map((obj) => {
        if (obj.key == e._id) {
          e.votes = obj.value;
        }
      });

      return { title: e.title, votes: e.votes };
    });

    poll[0].result = result;

    res.send(poll);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
