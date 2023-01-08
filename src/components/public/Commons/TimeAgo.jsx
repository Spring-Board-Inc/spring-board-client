import { parseISO, formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ timeStamp }) => {
    let timeAgo = ''
    if(timeStamp){
      timeStamp = new Date(timeStamp).toISOString()
      const date = parseISO(timeStamp);
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`
    }
    return (
      <span title={timeStamp}>
        &nbsp; <i>{timeAgo}</i>
      </span>
    )
}

export default TimeAgo