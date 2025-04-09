import { useRef, useState } from "react";
import { useGetDogs } from "./getDogs";
import Modal from "./Modal";

export default function App() {
   const { dogs, isLoading, isError } = useGetDogs();
   const [dogIndex, setDogIndex] = useState(0);
   const [comments, setComments] = useState({});
   const formRef = useRef(null);
   const [isModalOpen, setIsModelOpen] = useState(false);
 
   if (isLoading && !isError) {
     return <p>Loading...</p>;
   }
 
   if (!isLoading && isError) {
     return <p>Error fecthing dogs</p>;
   }
 
   if (dogs.length === 0) {
     return null;
   }
 
   const prevBtnHandler = () => {
     setDogIndex((prev) => prev - 1);
   };
 
   const nextBtnHandler = () => {
     setDogIndex((prev) => prev + 1);
   };
 
   const formSubmitHandler = (e) => {
     e.preventDefault();
     const currentDog = dogs[dogIndex].url;
     const formData = new FormData(e.target);
     const formProps = Object.fromEntries(formData);
     const currentDogComments = comments[currentDog] || {};
 
 
     const newComment = {
       id: Date.now(),
       comment: formProps["comment"],
       count: 0,
     };
     
     const updatedDogComments = {
      ...currentDogComments,
      [newComment.id]: newComment,
    };
 
     const updatedComments = {
       ...comments,
       [currentDog]: updatedDogComments,
     };
 
 
     setComments(updatedComments);

     formRef.current.reset();
   };

   const upVoteHandler = (id, url) => {
      setComments((prev) => ({
         ...prev,
         [url]: {
           ...(prev[url] || {}),
           [id]: {
             ...prev[url][id],
             vote: (prev[url][id]?.vote || 0) + 1
           }
         }
       }));
   }

   const onImageClickHandler = (index) => {
      setIsModelOpen(true);
      setDogIndex(index);
   }

   const onModalClose = () => {
      setIsModelOpen(false);
   }
 
   return (
     <div className="app">
         <div className="carousel">
               {dogs.map((dog, index) => {
                  const { url, title } = dog;
                  return (
                  <div className="slide" onClick={() => onImageClickHandler(index)}>
                     <img className="img-carousel" src={url} alt={title} />
                  </div>
                  );
               })}
         </div>
         <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <div>
               <img className="img-overlay" src={dogs[dogIndex].url} alt={dogs[dogIndex].title} />
               <p className="title">{dogs[dogIndex].title}</p>
               <div>
                     <button
                        className="prev"
                        disabled={dogIndex === 0}
                        onClick={prevBtnHandler}
                     >
                        &larr;
                     </button>
                     <button
                        className="next"
                        disabled={dogIndex === dogs.length - 1}
                        onClick={nextBtnHandler}
                     >
                        &rarr;
                     </button>
                  </div>
            </div>
            <div className="comments-section">
               <h1>Comments</h1>
               <form className="commentsForm" ref={formRef} onSubmit={formSubmitHandler}>
                        <input
                        name="comment"
                        type="text"
                        className="commentInput"
                        placeholder="Add Your Comment"
                        />
               </form>
               <div className="mt-4">
                        {comments[dogs[dogIndex].url] && Object.entries(comments[dogs[dogIndex].url]).map(([key,value]) => {
                           return (
                              <div key={key}>
                                 <p >{value.comment}</p>
                                 <span>{value.vote}</span>
                                 <button onClick={() => upVoteHandler(key,dogs[dogIndex].url)}>upvote</button>
                              </div>
                           )
                        })}
               </div>
            </div>
         </Modal>
     </div> 
   );
 }
 
