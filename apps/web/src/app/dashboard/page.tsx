export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              ברוכים הבאים ל-Cortex Dashboard 🚀
            </h1>
            <p className="text-muted-foreground text-lg">
              כאן תוכלו לנהל את המערכת שלכם ולעקוב אחר הנתונים החשובים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                משתמשים פעילים
              </h3>
              <p className="text-3xl font-bold text-primary">1,234</p>
              <p className="text-sm text-muted-foreground mt-2">
                +12% מהחודש הקודם
              </p>
            </div>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                בקשות API
              </h3>
              <p className="text-3xl font-bold text-primary">45,678</p>
              <p className="text-sm text-muted-foreground mt-2">
                +8% מהחודש הקודם
              </p>
            </div>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                זמן תגובה ממוצע
              </h3>
              <p className="text-3xl font-bold text-primary">123ms</p>
              <p className="text-sm text-muted-foreground mt-2">
                -5% מהחודש הקודם
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              פעילות אחרונה
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-foreground">משתמש חדש נרשם למערכת</span>
                <span className="text-sm text-muted-foreground">
                  לפני 2 דקות
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-foreground">
                  עדכון מערכת הושלם בהצלחה
                </span>
                <span className="text-sm text-muted-foreground">
                  לפני 15 דקות
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-foreground">גיבוי נתונים בוצע</span>
                <span className="text-sm text-muted-foreground">לפני שעה</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-foreground">דוח חודשי נוצר</span>
                <span className="text-sm text-muted-foreground">
                  לפני 3 שעות
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              זה רק התחלה! עוד הרבה פיצ'רים מגניבים בדרך... 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
