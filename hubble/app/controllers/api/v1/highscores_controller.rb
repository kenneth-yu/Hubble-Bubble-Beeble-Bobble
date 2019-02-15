class Api::V1::HighscoresController < ApplicationController
  before_action :find_highscore, only: [:update]
  def index
    @highscores = Highscore.all
    render json: @highscores
  end

  def show
    render json: @highscore
  end

  def create
    @highscore = Highscore.create(highscore_params)
    if @highscore.save
      render json: @highscore, status: :accepted
    else
      render json: { errors: @highscore.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @highscore.update(highscore_params)
    if @highscore.save
      render json: @highscore, status: :accepted
    else
      render json: { errors: @highscore.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def highscore_params
    params.permit(:username, :score)
  end

  def find_highscore
    @highscore = Highscore.find(params[:id])
  end

end
