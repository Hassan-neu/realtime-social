"use client";
import React from "react";
import { GoBookmarkFill, GoHeartFill } from "react-icons/go";
import { Button } from "./btn";
import { HiChatBubbleLeft } from "react-icons/hi2";
import Link from "next/link";
import { Avatar } from "./avatar";

export function TweetPost() {
    const username = "hnxo";
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer">
            <div className="flex flex-col gap-3 w-full">
                {/* <Avatar
                  className={"relative w-12 h-12 border shrink-0"}
                  url={avatar_url}
              /> */}
                <div className="flex gap-2">
                    <div className="relative w-12 h-12 border shrink-0 rounded-full bg-red-500"></div>
                    <Link
                        href={`/profile/${username}`}
                        className="flex flex-col gap-0.5 leading-"
                    >
                        <p className="text-xl font-bold">Hassan</p>
                        <p className="text-sm">{username}</p>
                    </Link>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="text-pretty">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis, voluptatum natus consequuntur dolor tenetur
                        delectus accusamus est quidem dignissimos neque officiis
                        rem? Alias atque esse aperiam aut quos. Aliquam,
                        tempora. Nulla ipsam quasi, cupiditate iste aut ducimus
                        dolores, impedit suscipit ad quos voluptatem ut.
                        Praesentium quod aliquam error, laboriosam suscipit
                        exercitationem expedita adipisci aspernatur facere velit
                        eveniet nostrum saepe, necessitatibus ea distinctio
                        rerum. Voluptates distinctio temporibus vitae, tempora
                        id voluptatum reiciendis tempore dolorem, possimus
                        cupiditate facere debitis culpa dolores error ratione
                        iusto, quos iste? Magnam numquam placeat consequatur
                        pariatur alias repellendus labore, similique suscipit.
                        Doloribus consectetur ducimus alias sequi earum quas
                        amet fugit unde, sed debitis asperiores ut iste
                        distinctio beatae officiis non, fuga dicta aspernatur
                        consequatur laboriosam? Hic, ullam voluptatum accusamus
                        a voluptatem voluptate sed minus vitae veritatis,
                        repellendus maiores iusto. At nihil iure accusamus vel
                        aut aliquam velit, quas amet voluptate repudiandae
                        doloremque natus quia deserunt? Possimus exercitationem
                        commodi nobis totam, vitae enim fugiat ratione eveniet
                        sapiente repudiandae aut illum eaque modi dignissimos
                        repellat culpa! Deleniti praesentium labore nihil minima
                        aspernatur, voluptatem sint natus incidunt quidem,
                        architecto quia odit. Nam quisquam voluptates dolore sit
                        nulla tempora, est provident harum voluptatem
                        repellendus nemo neque beatae laudantium optio culpa at?
                    </div>
                    <div className="flex gap-1 items-center text-sm">
                        <span>Today</span>
                        <span className="w-1 h-1 inline-block mx-0.5 rounded-full bg-black"></span>
                        <span>Date</span>
                    </div>
                    <div className="flex gap-3 justify-between border-y py-3">
                        <Button onClick={(e) => console.log(e.target)}>
                            <HiChatBubbleLeft
                                size={18}
                                fill="none"
                                strokeWidth={1}
                            />
                        </Button>
                        <Button
                            onClick={() => alert("Liked Button")}
                            className={"flex items-center gap-1"}
                        >
                            <GoHeartFill
                                size={18}
                                //   fill={`${liked ? "red" : "transparent"}`}
                                //   stroke={`${liked ? "red" : "currentColor"}`}
                                //   strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span className="text-xs">{2}</span>
                        </Button>
                        <Button
                            onClick={() => alert("Bookmarked Button")}
                            className={"flex items-center gap-1"}
                        >
                            <GoBookmarkFill
                                size={18}
                                //   fill={`${bookmarked ? "rgb(59 130 246)" : "transparent"}`}
                                //   stroke={`${
                                //       bookmarked ? "rgb(59 130 246)" : "currentColor"
                                //   }`}
                                //   strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span className="text-xs">{2}</span>
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="relative w-12 h-12 border shrink-0 rounded-full bg-red-500"></div>
                    <textarea
                        name=""
                        id=""
                        className="grow h-12 resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                        placeholder="What's on your mind?!"
                        maxLength={200}
                    ></textarea>
                    <Button
                        className={
                            "px-4 py-1 rounded-full font-semibold bg-blue-400 text-white"
                        }
                    >
                        Reply
                    </Button>
                </div>
            </div>
        </div>
    );
}
