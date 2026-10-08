import java.util.Scanner;
class Main {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("================================");
        System.out.println("          ZEN NOTEBOOK           ");
        System.out.println("================================");
        System.out.println("1. New Note");
        System.out.println("2. View Notes");
        System.out.println("3. Search Notes");
        System.out.println("4. Edit Note");
        System.out.println("5. Delete Notes");
        System.out.println("6. Exit");
        System.out.print("Choose: ");
        int choice = scan.nextInt();
        scan.nextLine();
        switch (choice) {
            case 1:
                Create.createNote(scan);
                break;
            case 2:
                See.seeNotes();
                break;
            case 3:
                Search.searchNotes(scan);
                break;
            case 4:
                Edit.editNote(scan);
                break;
            case 5:
                Delete.deleteNote(scan);
                break;
            case 6:
                System.out.println("Goodbye!");
                break;
            default:
                System.out.println("Invalid choice");
        }
        scan.close();
    }
}