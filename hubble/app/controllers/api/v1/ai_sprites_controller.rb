class Api::V1::AiSpritesController < ApplicationController
  before_action :find_ai_sprite, only: [:update]
  def index
    @ai_sprites = AiSprite.all
    render json: @ai_sprites
  end

  def show
    render json: @ai_sprite
  end

  def create
    @ai_sprite = AiSprite.create(ai_sprite_params)
    if @ai_sprite.save
      render json: @ai_sprite, status: :accepted
    else
      render json: { errors: @ai_sprite.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @ai_sprite.update(ai_sprite_params)
    if @ai_sprite.save
      render json: @ai_sprite, status: :accepted
    else
      render json: { errors: @ai_sprite.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def ai_sprite_params
    params.permit(:name, :start, :end, :playable_sprite_id, :ai_sprite_id)
  end

  def find_ai_sprite
    @ai_sprite = AiSprite.find(params[:id])
  end

end
