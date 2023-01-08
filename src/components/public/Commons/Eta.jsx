import { parseISO, differenceInDays } from 'date-fns'

const Eta = ({ timeStamp }) => {
    let timeLeft = ''
    if(timeStamp){
      timeStamp = new Date(timeStamp).toISOString()
      const date = parseISO(timeStamp);
      const timePeriod = differenceInDays(date, new Date());
      timeLeft = `${timePeriod} days left`
    }
    return (
      <span title={timeStamp}>
        &nbsp; <i>{timeLeft}</i>
      </span>
    )
}

export default Eta