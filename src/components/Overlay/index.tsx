import React from "react";

const Overlay = () => {
  return (
    <>
      <div
        id="modal-overlay"
        className="fixed left-0 top-0 z-[100] w-screen h-screen bg-black bg-opacity-50 transition-opacity backdrop-blur-sm cursor-[default]"
      />

      <style jsx>
        {`
          #share-box-overlay {
            opacity: 0;
            animation: fadeInAnimation 0.3s forwards;
          }

          @keyframes fadeInAnimation {
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Overlay;
