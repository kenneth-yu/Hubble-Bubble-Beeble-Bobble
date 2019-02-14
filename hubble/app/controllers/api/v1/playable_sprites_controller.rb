class Api::V1::PlayableSpritesController < ApplicationController
  before_action :find_playable_sprite, only: [:update]
  def index
    @playable_sprites = PlayableSprite.all
    render json: @playable_sprites
  end

  def show
    render json: @playable_sprite
  end

  def create
    @playable_sprite = PlayableSprite.create(playable_sprite_params)
    if @playable_sprite.save
      render json: @playable_sprite, status: :accepted
    else
      render json: { errors: @playable_sprite.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @playable_sprite.update(playable_sprite_params)
    if @playable_sprite.save
      render json: @playable_sprite, status: :accepted
    else
      render json: { errors: @playable_sprite.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def playable_sprite_params
    params.permit(:name, :location, :height, :width)
  end

  def find_playable_sprite
    @playable_sprite = PlayableSprite.find(params[:id])
  end

end
