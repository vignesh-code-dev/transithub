// import {
//   Star,
// } from "lucide-react";

// function ReviewCard({
//   review,
// }) {

//   return (

//     <div
//       className="
//       bg-white
//       border
//       border-[#E0E0E0]

//       rounded-md
//       shadow-sm

//       p-5
//       "
//     >

//       {/* TOP */}

//       <div
//         className="
//         flex
//         items-start
//         justify-between
//         gap-4
//         "
//       >

//         <div>

//           <h2
//             className="
//             text-lg
//             font-semibold
//             text-[#1A1A2E]
//             "
//           >
//             {review.passenger}
//           </h2>

//           <p
//             className="
//             text-sm
//             text-[#5D6D7E]
//             mt-1
//             font-mono
//             "
//           >
//             {review.tripId}
//           </p>

//         </div>

   

//         <div
//           className="
//           flex
//           items-center
//           gap-1
//           "
//         >

//           {[...Array(review.rating)].map(
//             (_, index) => (

//               <Star
//                 key={index}
//                 size={16}
//                 className="
//                 fill-[#F9A825]
//                 text-[#F9A825]
//                 "
//               />

//             )
//           )}

//         </div>

//       </div>


//       <p
//         className="
//         text-sm
//         text-[#1A1A2E]

//         mt-5
//         leading-6
//         "
//       >
//         {review.comment}
//       </p>

//     </div>
//   );
// }

// export default ReviewCard;



import {
  Star,
  MessageSquare,
} from "lucide-react";

function ReviewCard({
  review,
}) {

  return (

    <div
      className="
      bg-white
      border
      border-[#E0E0E0]

      rounded-md
      shadow-sm

      p-5
      "
    >

      {/* TOP */}

      <div
        className="
        flex
        items-start
        justify-between
        gap-4
        "
      >

        <div>

          <h2
            className="
            text-lg
            font-semibold
            text-[#1A1A2E]
            "
          >
            {review.customer}
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]
            mt-1
            "
          >
            {review.date}
          </p>

        </div>

        {/* RATING */}

        <div
          className="
          flex
          items-center
          gap-1
          "
        >

          <Star
            size={18}
            className="
            fill-yellow-400
            text-yellow-400
            "
          />

          <span
            className="
            text-sm
            font-semibold
            text-[#1A1A2E]
            "
          >
            {review.rating}.0
          </span>

        </div>

      </div>

      {/* COMMENT */}

      <p
        className="
        text-sm
        text-[#1A1A2E]

        mt-5
        leading-6
        "
      >
        {review.comment}
      </p>

      {/* ACTION */}

      <button
        className="
        mt-6

        inline-flex
        items-center
        gap-2

        h-10
        px-4

        rounded-md

        bg-[#1B5E20]

        text-white
        text-sm
        font-semibold

        hover:bg-[#2E7D32]

        transition-all
        "
      >

        <MessageSquare size={16} />

        Reply

      </button>

    </div>
  );
}

export default ReviewCard;