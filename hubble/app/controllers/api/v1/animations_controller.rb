class Api::V1::AnimationsController < ApplicationController
  before_action :find_animation, only: [:update]
  def index
    @animations = Animation.all
    render json: @animations
  end

  def show
    render json: @animation
  end

  def create
    @animation = Animation.create(animation_params)
    if @animation.save
      render json: @animation, status: :accepted
    else
      render json: { errors: @animation.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @animation.update(animation_params)
    if @animation.save
      render json: @animation, status: :accepted
    else
      render json: { errors: @animation.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def animation_params
    params.permit(:name, :start, :end, :playable_sprite_id, :ai_sprite_id)
  end

  def find_animation
    @animation = Animation.find(params[:id])
  end

end
