export interface IBet {
  bet_target_id: number;
  bet_target_name: string;
  coins_amount: number;
  date_of_bet: string;
  isBetWon: boolean | null;
  match_id: number;
  user_id: string;
  id: string;
}
