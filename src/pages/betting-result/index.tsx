/**
 * Page for Betting results
 * * Wrote by SJ
 * @param
 * @returns
 *
 * TODO
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

import Divider from "./Divider";
import PercentageBar from "./PercentageBar";
import Rank from "./Rank";
import User from "./User";
import { useParams } from "react-router-dom";
import PercentageBarpurple from "./PercentageBarpurple";

// Rank TestCase
// type Rank = {
//   id: string;
//   point: number;
// };

// const example_rank: Rank[] = [
//   {
//     id: "id_1",
//     point: 100,
//   },
//   {
//     id: "id_2",
//     point: 80,
//   },
//   {
//     id: "id_3",
//     point: 70,
//   },
//   {
//     id: "id_4",
//     point: 40,
//   },
//   {
//     id: "id_5",
//     point: 20,
//   },
//   {
//     id: "id_6",
//     point: 10,
//   },
//   {
//     id: "id_7",
//     point: 7,
//   },
//   {
//     id: "id_8",
//     point: 4,
//   },
//   {
//     id: "id_9",
//     point: 3,
//   },
//   {
//     id: "id_10",
//     point: 1,
//   },
// ];

type Betting = {
  id: string;
  title: string;
  host_id: string;
  created_date: string;
  players: { id: string; bet_index: number; point: number }[];
  options: string[];
  deadline: number;
};

type User = {
  id: string;
  username: string;
  summary: string;
  point: number;
  num_of_host_ticket: number;
};

export default function BettingResult() {
  const [data, setData] = useState<Betting | null>(null);
  const [host, setHost] = useState<User | null>(null);
  const [statistics, setStatistics] = useState<number[] | null>(null);
  const [statistics_num, setStatistics_num] = useState<number[] | null>(null);
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  console.log(params);

  const fetchData = async () => {
    try {
      setData(null);
      // loading 상태를 true 로 바꿉니다.
      //setLoading(true);
      const response = await axios.get(
        "https://api.seongjinemong.app/betting/" + params["bettingId"]
      );
      setData(response.data); // 데이터는 response.data 안에 들어있습니다.

      //console.log(response);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        console.error(
          "404 Not Found: The requested resource could not be found."
        );
        setError("404");
      } else {
        console.error("An error occurred:", e);
      }
    }
  };

  const fetchHostData = async () => {
    try {
      setHost(null);
      const hostresponse = await axios.get(
        `https://api.seongjinemong.app/users/${data?.host_id}`
      );
      setHost(hostresponse.data);
    } catch (e) {
      console.log(e);
    }
    //setLoading(false);
  };

  const calculateStatistics = (
    players: { id: string; bet_index: number; point: number }[],
    optionsLength: number
  ) => {
    const pointsResult = Array(optionsLength).fill(0);
    const votesResult = Array(optionsLength).fill(0);

    for (const player of players) {
      if(player.id == "10") {
        setUserPoints(player.point)
      }
      pointsResult[player.bet_index] += player.point;
      votesResult[player.bet_index] += 1; // Add this line to count votes
    }

    setStatistics(pointsResult);
    setStatistics_num(votesResult); // Add this line to set votes statistics
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      fetchHostData();
      calculateStatistics(data.players, data.options.length);
    }
  }, [data]);

  useEffect(() => {
    if (statistics) {
      calculateStatistics(data!.players, data!.options.length);
    }
  }, [statistics]);

  return data && host && statistics && statistics_num ? (
    <div className="w-[1024px] mt-10 flex flex-col gap-8 mb-24">
      {/*제목과 기본 정보*/}
      <div className="text-4xl font-bold">{data.title}</div>

      <div>
        <div className="text-xl text-primary-green-300 font-bold">
          {"포인트 기준, 과반수 승리"}
        </div>
        <div className="text-xl text-primary-green-300 font-bold">
          {new Date(Number(data.deadline)).toString()}
        </div>
      </div>

      <User id={host?.username} />

      <Divider />

      {/*통계*/}
      <div className="text-4xl font-bold">{"통계"}</div>

      <PercentageBar
        title={"투표율 기준"}
        ratio={statistics_num[0] / (statistics_num[0] + statistics_num[1])}
        selections={data.options}
      />
      <PercentageBarpurple
        title={"포인트 기준"}
        ratio={statistics[0] / (statistics[0] + statistics[1])}
        selections={data.options}
      />

      <Divider />

      {/*사용자가 얻은 포인트*/}
      {userPoints !== null && (
        <>
          <div className="text-4xl font-bold">{"내가 얻은 포인트"}</div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <div className="text-2xl font-bold mb-2">
                {`${userPoints.toFixed(
                  2
                )} = 내가 베팅한 포인트 * (승자 포인트 비율 / 패자 포인트 비율)`}
              </div>
            </div>
            <div className="text-4xl font-bold text-primary-green-400">
              {`+ ${userPoints.toFixed(2)}`}
            </div>
          </div>

          <Divider />
        </>
      )}

      {/*가장 많은 포인트를 얻은 사용자*/}
      <div className="text-4xl font-bold">{"최다 포인트 획득 Top 10"}</div>

      <Rank data={data.players.sort((a, b) => b.point - a.point).slice(0, 10)} />
    </div>
  ) : error ? (
    <div>404</div>
  ) : (
    <div>Loading...</div>
  );
}
