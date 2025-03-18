
export const Spinner = () => {
    return (
        <div className="spinner-container">
          <div className="spinner"></div>
          <style jsx>{`
            .spinner-container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            }
            
            .spinner {
              width: 48px;
              height: 48px;
              border: 4px solid rgba(0, 0, 0, 0.1);
              border-radius: 50%;
              border-top: 4px solid #3498db;
              animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
};
  
