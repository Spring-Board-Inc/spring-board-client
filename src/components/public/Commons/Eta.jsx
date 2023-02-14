import { parseISO, differenceInDays } from 'date-fns'

const Eta = ({ timeStamp }) => {
    let timeLeft = ''
    if(timeStamp){
      timeStamp = new Date(timeStamp).toISOString()
      const date = parseISO(timeStamp);
      const timePeriod = differenceInDays(date, new Date());
      timeLeft = timePeriod === 0 ? 'Today' : timePeriod < 0 ? `${Math.abs(timePeriod)} days ago` : `${timePeriod} days left`
    }
    return (
      <span title={timeStamp}>
        &nbsp; <i>{timeLeft}</i>
      </span>
    )
}

export default Eta