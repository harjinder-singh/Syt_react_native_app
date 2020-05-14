class Image {
  constructor(id, userId, imageUrl, description, createAt, updatedAt) {
    this.id = id,
    this.userId = userId
    this.imageUrl = imageUrl;
    this.description = description;
    this.createdAt = createAt;
    this.updatedAt = updatedAt;
  }
}

export default Image;
