namespace Application.Photos
{
    public class EmptyPhotoUploadResult : PhotoUploadResult
    {
        public EmptyPhotoUploadResult()
        {
            Id = string.Empty;
            Url = string.Empty;
        }
    }
}