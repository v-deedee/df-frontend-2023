import icon from '../../empty-icon.svg';

interface Noti {
  type: string
}

const Notification: React.FC<Noti> = ({ type }) => {
  return (
    <div id='notification'>
      <img src={icon} alt='icon' />
      { type === 'search' ? <p>No books match your search</p> : <p>No books available</p> }
    </div>
  );
}

export default Notification;